# Anipool

[Anipool](https://www.anipool.app/) is a webapp to create anime related polls and quizes, it was created using [NextJS](https://nextjs.org/) on both front and backend, [TailwindCSS](https://tailwindcss.com/) was used as CSS framework and [DynamoDB](https://aws.amazon.com/pt/dynamodb/) as database

## Dependencies

NodeJS >= 16

## Environment Variables

You need to create a .env.local file, [as the example](https://github.com/guilhermeg2k/anipool/blob/main/.env.local.example), on the root of the project with the following variables:

NEXT_PUBLIC_ANILIST_CLIENT_ID: Anilist client id, you can get it [here](https://anilist.co/settings/developer)

ANIPOOL_AWS_ACCESS_KEY_ID: AWS access key id to access DynamoDB (you can get it [here](https://console.aws.amazon.com/iam/home?#/security_credentials))

ANIPOOL_AWS_SECRET_ACCESS_KEY : AWS access key id to access DynamoDB (you can get it [here](https://console.aws.amazon.com/iam/home?#/security_credentials))

ANIPOOL_AWS_REGION: AWS access key id to access DynamoDB (you can get it [here](https://console.aws.amazon.com/iam/home?#/security_credentials))

JWT_SECRET: Secret to generate JWT tokens you can use [this](https://www.browserling.com/tools/random-string) to generate a random string

## Developing

Clone the repository, set the environment variables and run the following commands:

```bash
npm install
npm run dev
```

## Building

Clone the repository, set the environment variables and run the following commands:

```bash
npm install
npm run build
npm run start
```

## Contributing

I need to organize things but for now you can check what i'm working on [here](https://anipool.notion.site/c717de9fa8ac4616ab9af92e28f41b32?v=21bed3e8e8954820b63e110876f3a8d7) (The cards are not detailed) and if you want to contribute you can open an issue with the link of the feature/bug you want to work on and i'll give you some details about it if needed then you can open a PR with the changes and i'll review it

## Change Logs

[Change logs](https://github.com/guilhermeg2k/anipool/blob/main/CHANGELOG.md)

## License

[MIT License](https://github.com/guilhermeg2k/anipool/blob/main/LICENSE)
