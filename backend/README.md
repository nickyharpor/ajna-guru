# Ajna Guru Backend

This is the backend for Ajna Guru project. It provides APIs
for the frontend to work. The APIs are public and can be
called by any other project.

## Public API Base Address

`https://api.ajna.guru`

## API Endpoints

### Get Deployments

Responds with an array of active deployments for the Akash
address `id`. Pagination through the array can be done via
`offset` and `limit` parameters.

```
GET /owner/{id}?limit=127&offset=0
```

#### Parameters

| Name   | Type                   |
|--------|------------------------|
| id     | string                 |
| limit  | integer (default: 127) |
| offset | integer (default: 0)   |

#### Response

`application/json`

##### Example Response

```
{
  "data": [
    {
      "dseq": "12315756",
      "settledAt": "12855176",
      "providerName": "akash",
      "balance": {
        "amount": "4751191.000000000000000000",
        "denom": "uakt"
      },
      "transferred": {
        "amount": "10248809.000000000000000000",
        "denom": "uakt"
      },
      "price": {
        "amount": "10000.000000000000000000",
        "denom": "uakt"
      },
      "resources": {
        "count": 1,
        "cpu": "3000",
        "memory": "5368709120",
        "storage": "64424509440",
        "network": 3
      }
    },
    {
      "dseq": "12316016",
      "settledAt": "12855194",
      "providerName": "akash",
      "balance": {
        "amount": "2451620.000000000000000000",
        "denom": "uakt"
      },
      "transferred": {
        "amount": "7548380.000000000000000000",
        "denom": "uakt"
      },
      "price": {
        "amount": "10000.000000000000000000",
        "denom": "uakt"
      },
      "resources": {
        "count": 1,
        "cpu": "2000",
        "memory": "4294967296",
        "storage": "53687091200",
        "network": 3
      }
    }
  ]
}
```

-------

### Get Deployment by DSEQ

Returns remaining blocks and time for a deployment specified
by `dseq` owned by Akash address `id`.

```
GET /owner/{id}/{dseq}
```

#### Parameters

| Name | Type    |
|------|---------|
| id   | string  |
| dseq | integer |

#### Response

`application/json`

##### Example Response

```
{
  "balanceRemaining": 4703463,
  "blocksRemaining": 247550,
  "estimatedTimeRemaining": "PT446H57M55S"
}
```

-------

### Check Subscription

Responds with a boolean `enabled` which shows if a Telegram
ID `telegramId` is subscribed to receive notifications for
a specified Akash address `akashAddress`.

```
GET /subscription/{akashAddress}/{telegramId}
```

#### Parameters

| Name | Type    |
| --- |---------|
| akashAddress | string  |
| telegramId | integer |

#### Response

| Name | Type |
| --- | --- |
| akashAddress | string  |
| telegramId | integer |
| enabled | boolean |

##### Example Response

```
{
"telegramId": 0,
"akashAddress": "string",
"enabled": true
}
```

-------

### Enable Subscription

Enables subscription to a specified Akash address
`akashAddress` for Telegram ID `telegramId`.
.

```
POST /initiation/{telegramId}/{akashAddress}
```

#### Parameters

| Name | Type    |
| --- |---------|
| akashAddress | string  |
| telegramId | integer |

#### Response

| Name | Type |
| --- | --- |
| enabled | boolean |

##### Example Response

```
 true
```

-------

### Disable Subscription

Disables subscription to a specified Akash address
`akashAddress` for Telegram ID `telegramId`.

```
DELETE /initiation/{telegramId}/{akashAddress}
```

#### Parameters

| Name | Type    |
| --- |---------|
| akashAddress | string  |
| telegramId | integer |

#### Response

| Name | Type |
| --- | --- |
| enabled | boolean |

##### Example Response

```
 false
```
