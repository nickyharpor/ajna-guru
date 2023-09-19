from mongo import Mongo
import helper
from env import env
import sys
from telethon import TelegramClient, sync

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

bot.start(bot_token=config.bot_token)

if len(sys.argv) < 4:
    help_msg = '''
    Ajna Guru's bot sends you notifications when your Akash deployments are about to run out of funds.
        
    Here are the list of available commands:
        
        Start receiving notifications for <akash1addr>:
        `/start <akash1addr>`
        
        Stop receiving notifications for <akash1addr>:
        `/stop <akash1addr>`
        
        List all notification addresses for this Telegram account:
        `/list`
    '''
    bot.send_message(int(sys.argv[1]), help_msg)
else:
    if sys.argv[2] == 'start':
        helper.start_notification_sync(db, bot, int(sys.argv[1]), sys.argv[3])
    elif sys.argv[2] == 'stop':
        helper.stop_notification_sync(db, bot, int(sys.argv[1]), sys.argv[3])

print(True)
bot.disconnect()
