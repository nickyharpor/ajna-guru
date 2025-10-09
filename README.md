# Ajna Guru

![logo](logo.svg)

Ajna Guru is your third eye on Akash network...

* Manage all your deployments and finances in one place.

* Recieve notifications on Telegram (never forget to top up a deployment contract again).

* Automate Akash deployments via APIs.

## What does Ajna mean?

Ajna or third eye chakra, is the 6th primary chakra in the body according to Hindu tradition and signifies the unconscious mind. It gives people the ability to communicate with the world and helps them receive messages from the past and the future.

## Project Components

### Backend

Ajna Guru's [backend](backend) is written in Java. It's the backbone of communication with Akash network. It also provides [API endpoints](backend/README.md) for third party apps to help with automation processes.

### Frontend

[Frontend](frontend) is a React project. You can connect your wallet and make payments for your deployments. You can also connect your Telegram to the web app and manage your notifications.

### Bot

A [Telegram bot](bot) works in accordance with the system to send notifications to the users. It is written in Python. It notifies users when their deployments are about to run out of funds. It is live at [https://t.me/ajna_guru_bot](https://t.me/ajna_guru_bot).
