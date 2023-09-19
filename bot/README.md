# Ajna Guru Bot

Ajna Guru's bot sends you notifications when your Akash deployments are about to run out of funds.
        
Here are the list of available commands:
        
Start receiving notifications for <akash1addr>:
`/start <akash1addr>`
        
Stop receiving notifications for <akash1addr>:
`/stop <akash1addr>`
        
List all notification addresses for your Telegram account:
`/list`

## Running Your Own Bot

Set up your own Ajna bot by following these
steps:

1) Go to [My Telegram](https://my.telegram.org/)
   and get a pair of `api_id` and `api_hash`.
2) Make a bot via [@BotFather](https://t.me/BotFather).
3) Make and activate a `venv` and install
   [requirements.txt](/requirements.txt).
4) Install **MongoDB**.
5) Copy [config_test.py](/config_test.py) to
   `config_live.py` and fill in the values.
6) Run `python3 bot.py`.
7) Add a cron job running `python3 cron.py` 
   inside (same `venv`).
