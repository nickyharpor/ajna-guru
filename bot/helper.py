async def start_notification(db, bot, telegram_id, address):
    if address.startswith('akash1') and len(address) == 44:
        c = db.count('notifications', {'akash_address': address, 'telegram_id': telegram_id, 'is_enabled': True})
        if c > 0:
            await bot.send_message(telegram_id, f'You already receive notifications for `{address}`.')
        else:
            c = db.count('notifications', {'akash_address': address, 'telegram_id': telegram_id})
            if c == 0:
                db.insert('notifications', {'akash_address': address, 'telegram_id': telegram_id, 'is_enabled': True})
            else:
                db.update('notifications', {'akash_address': address, 'telegram_id': telegram_id},
                          {'$set': {'is_enabled': True}})
            await bot.send_message(telegram_id, f'You will receive notification for `{address}`.')
    else:
        await bot.send_message(telegram_id, 'Malformed Akash address.')


async def stop_notification(db, bot, telegram_id, address):
    if address.startswith('akash1') and len(address) == 44:
        c = db.count('notifications', {'akash_address': address, 'telegram_id': telegram_id, 'is_enabled': False})
        if c > 0:
            await bot.send_message(telegram_id, f'You already don\'t receive notifications for `{address}`.')
        else:
            c = db.count('notifications', {'akash_address': address, 'telegram_id': telegram_id})
            if c == 0:
                db.insert('notifications', {'akash_address': address, 'telegram_id': telegram_id, 'is_enabled': False})
            else:
                db.update('notifications', {'akash_address': address, 'telegram_id': telegram_id},
                          {'$set': {'is_enabled': False}})
            await bot.send_message(telegram_id, f'You won\'t receive notification for `{address}` anymore.')
    else:
        await bot.send_message(telegram_id, 'Malformed Akash address.')


def start_notification_sync(db, bot, telegram_id, address):
    if address.startswith('akash1') and len(address) == 44:
        c = db.count('notifications', {'akash_address': address, 'telegram_id': telegram_id, 'is_enabled': True})
        if c > 0:
            bot.send_message(telegram_id, f'You already receive notifications for `{address}`.')
        else:
            c = db.count('notifications', {'akash_address': address, 'telegram_id': telegram_id})
            if c == 0:
                db.insert('notifications', {'akash_address': address, 'telegram_id': telegram_id, 'is_enabled': True})
            else:
                db.update('notifications', {'akash_address': address, 'telegram_id': telegram_id},
                          {'$set': {'is_enabled': True}})
            bot.send_message(telegram_id, f'You will receive notification for `{address}`.')
    else:
        bot.send_message(telegram_id, 'Malformed Akash address.')


def stop_notification_sync(db, bot, telegram_id, address):
    if address.startswith('akash1') and len(address) == 44:
        c = db.count('notifications', {'akash_address': address, 'telegram_id': telegram_id, 'is_enabled': False})
        if c > 0:
            bot.send_message(telegram_id, f'You already don\'t receive notifications for `{address}`.')
        else:
            c = db.count('notifications', {'akash_address': address, 'telegram_id': telegram_id})
            if c == 0:
                db.insert('notifications', {'akash_address': address, 'telegram_id': telegram_id, 'is_enabled': False})
            else:
                db.update('notifications', {'akash_address': address, 'telegram_id': telegram_id},
                          {'$set': {'is_enabled': False}})
            bot.send_message(telegram_id, f'You won\'t receive notification for `{address}` anymore.')
    else:
        bot.send_message(telegram_id, 'Malformed Akash address.')
