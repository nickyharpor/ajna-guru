from telethon import TelegramClient, sync
from telethon.tl.types import PeerUser
from env import env
from mongo import Mongo
import requests


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

try:
    all_n = db.find('notifications', {'is_enabled': True})
    for n in all_n:
        api_url = f'http://127.0.0.1:8080/owner/{n.get("akash_address")}'
        response = requests.get(api_url).json()
        for data in response['data']:
            if int(data['balance']['amount']) < 250000:
                bot.send_message(PeerUser(n.get("telegram_id0")),
                                 f'Deployment #{data["dseq"]} has less than 0.25 AKT left!')
except:
    print('FUCK')

bot.disconnect()
