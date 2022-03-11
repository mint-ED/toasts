## mintED TOASTs (Tokens of Appreciation)

coming soon

# Installation

coming soon

## Backend

```sh
tbd
```

## Frontend

```sh
tbd
```

# Configuration

coming soon

```js
tbd
```

# Notes to clean up and move to above sections

Config Instructions:

setNameAndSymbol:  change based on client deployment.  default is mintED/TOAST

*Configure Token*

setTokenMaxSupply:  
-don't call:  unlimited semi-fungible token
-1:  1of1 NFT (similar to ERC721 standard)
->1: limited supply semi-fungible token


*Set Token Uris*

setTokenURIOption (1 is default, used for images in same folder.  3 is used for one-offs (like TOASTs))

For Option 3 (specific uri for a token- only one token at this address)

    setTokenIdToURI (new token id, uri to json)   uri format:  ipfs://[location]/[tokenid].[tokenExtension]
    example:  ipfs://QmPhhpWRKPz4FkBABEGWABh9SUkAnZC5GPJ1gkpYoSvENS/0.json


*Give a Toast (mint)*

toastSingleToSingle
to: receiver
id: tokenId (e.g. 0)
amount: token quantity (e.g. 1)
data: 0x0











