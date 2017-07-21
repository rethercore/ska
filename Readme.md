# Sikka API

#### List of Public API's
- /api/init
    Request Type - Get
    Input -
    - address (String) - [Must be a bitcoin address]
    Output - (Json Object)
    - Txno (String) - [Is a unique number for each state request]
    - EthereumAddress (String) - [Is associated ethereum address]
- /api/check
    Request Type - Get
    Input -
    - Txno (String) - [Must be a unique string associated to the state request]
    Output - (Json Object)
    - State (String) - [State of Tx]
    - Object (JSON) - [Assocated params for each state]
- /api/fetchTxn
    Request Type - Get
    Input -
    - Txno (String) - [Must be a unique string associated to the state request]
    Output - (Json Object)
    - Ethaddress (String) - [Ethereum address associated to Tx]

#### List of Objects

 ##### Bitcore
    - generatePrivateKeys
    - fetchAddres
    - fetchPubkey
    - fetchHDpublicKey
    - sign
    - addressValid

 ##### BTCapi
    - checkBalance
    - newTxn
    - sendFx
    - sendTxns

 ##### DB
    - SikkaSchemaJSON
    - sikkaSchema
    - sikkaModel

 ##### Ethereum
    - checkTokenBalance

 ##### Ethcore
    - generateRandom
    - generatePassword
    - generateAddress

 ##### Exchange
    - sikkaExB2E
    - sikkaExE2B
    - setRate

 ##### SikkaCore
    - init
    - check
    - fetchTxn
