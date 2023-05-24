
# Thumb this

O presente projeto tem como objetivo redimensionar imagens de acordo com o fator de compactação enviado.


## Documentação da API

#### Salva imagem original e redimensionada e retorna seus metadados

```http
  POST /image/save
```


## Rodando a Aplicação

Para rodar a aplicação, rode os seguintes comandos:

```bash
  git clone https://github.com/gumrqs/thumb-this.git
```
```bash 
  npm i && npx prisma generate 
```
```bash 
  npm start 
```

## Exemplo 1 de Requisição POST
### Body:
```javascript
{
    "image": "https://assets.storage.trakto.io/AkpvCuxXGMf3npYXajyEZ8A2APn2/0e406885-9d03-4c72-bd92-c6411fbe5c49.jpeg",
    "compress": 0.9
}

```
### Retorno (Sucesso):
```javascript
{
  "localpath": {
    "original": "/home/erick/Gustavo/thumb-this/images/0e406885-9d03-4c72-bd92-c6411fbe5c49_original.jpg",
    "thumb": "/home/erick/Gustavo/thumb-this/images/0e406885-9d03-4c72-bd92-c6411fbe5c49_thumb.jpg"
  },
  "metadata": {
    "Make": "Apple",
    "Model": "iPhone 11",
    "Orientation": "Horizontal (normal)",
    "XResolution": 72,
    "YResolution": 72,
    "ResolutionUnit": "inches",
    "Software": "16.1.1",
    "ModifyDate": "2022-11-17T23:13:59.000Z",
    "HostComputer": "iPhone 11",
    "TileWidth": 512,
    "TileLength": 512,
    "ExposureTime": 0.023809523809523808,
    "FNumber": 1.8,
    "ExposureProgram": "Normal program",
    "ISO": 320,
    "ExifVersion": "2.3.2",
    "DateTimeOriginal": "2022-11-17T23:13:59.000Z",
    "CreateDate": "2022-11-17T23:13:59.000Z",
    "OffsetTime": "-03:00",
    "OffsetTimeOriginal": "-03:00",
    "OffsetTimeDigitized": "-03:00",
    "ShutterSpeedValue": 5.381182507010322,
    "ApertureValue": 1.6959938128383605,
    "BrightnessValue": -0.6750610904449875,
    "ExposureCompensation": -1.3275746571237175,
    "MeteringMode": "Pattern",
    "Flash": "Flash did not fire, compulsory flash mode",
    "FocalLength": 4.25,
    "SubjectArea": {
      "0": 1996,
      "1": 1499,
      "2": 2206,
      "3": 1387
    },
    "SubSecTimeOriginal": "890",
    "SubSecTimeDigitized": "890",
    "ExifImageWidth": 3024,
    "ExifImageHeight": 4032,
    "SensingMethod": "One-chip color area sensor",
    "SceneType": "Directly photographed",
    "ExposureMode": "Auto",
    "WhiteBalance": "Auto",
    "FocalLengthIn35mmFormat": 26,
    "LensInfo": [
      1.5399999618512084,
      4.25,
      1.8,
      2.4
    ],
    "LensMake": "Apple",
    "LensModel": "iPhone 11 back dual wide camera 4.25mm f/1.8",
    "CompositeImage": "General Composite Image",
    "GPSLatitudeRef": "S",
    "GPSLatitude": [
      9,
      36,
      47.24
    ],
    "GPSLongitudeRef": "W",
    "GPSLongitude": [
      35,
      43,
      30.72
    ],
    "GPSAltitudeRef": {
      "0": 0
    },
    "GPSAltitude": 56.46832101372756,
    "GPSSpeedRef": "K",
    "GPSSpeed": 0.2655744302651217,
    "GPSImgDirectionRef": "T",
    "GPSImgDirection": 162.76583850931678,
    "GPSDestBearingRef": "True North",
    "GPSDestBearing": 162.76583850931678,
    "GPSHPositioningError": 7.849353822413682,
    "latitude": -9.613122222222222,
    "longitude": -35.7252
  }
}

```
## Exemplo 2 de Requisição POST
### Body:
```javascript
{
    "image": "https://assets.storage.trakto.io/AkpvCuxXGMf3npYXajyEZ8A2APn2/0e406885-9d03-4c72-bd92-c6411fbe5c49.jpeg",
    "compress": "0.9"
}

```

### Retorno (Falha):
```javascript
{
  "statusCode": 500,
  "message": "Error resizing image"
}

```
