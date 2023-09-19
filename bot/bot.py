from telethon import TelegramClient, events
from env import env
from mongo import Mongo
import helper


# Environment detection
if env == 'live':
    import config_live
    config = config_live
elif env == 'dev':
    import config_dev
    config = config_dev
else:
    import config_test
    config = config_test

# Connect to database
db = Mongo(config.db_host, config.db_port, config.db_name)

# Initialize Telegram client
if config.proxy:
    bot = TelegramClient(session=config.session_name, api_id=config.api_id, api_hash=config.api_hash,
                         proxy=(config.proxy_protocol, config.proxy_host, config.proxy_port))
else:
    bot = TelegramClient(session=config.session_name, api_id=config.api_id, api_hash=config.api_hash)


@bot.on(events.NewMessage(pattern='/start', incoming=True))
async def start(event):
    address = event.message.message.replace('/start', '').strip()
    await helper.start_notification(db, bot, event.sender_id, address)
    raise events.StopPropagation


@bot.on(events.NewMessage(pattern='/stop', incoming=True))
async def stop(event):
    address = event.message.message.replace('/stop', '').strip()
    await helper.stop_notification(db, bot, event.sender_id, address)
    raise events.StopPropagation


@bot.on(events.NewMessage(pattern='/list', incoming=True))
async def info(event):
    all_n = db.find('notifications', {'telegram_id': event.sender_id})
    fstr = 'Your notification list:\n'
    for n in all_n:
        if n.get('is_enabled'):
            fstr += f'+ {n.get("akash_address")}\n'
        else:
            fstr += f'- {n.get("akash_address")}\n'
    await event.respond(fstr)
    raise events.StopPropagation

# Connect to Telegram and run in a loop
try:
    print('bot starting...')
    bot.start(bot_token=config.bot_token)
    print('bot started')
    bot.run_until_disconnected()
finally:
    print('never runs in async mode!')
