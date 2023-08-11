# Botnet Detection using Pangea's IP Reputation API Demo

Using Panagea's IP reputation APIs you can detect and block bots from running critical operations such as registrations, logins, payments on your platform.

## Why not use Cloudflare or a WAF?
Well, Cloudflare let's you block most DDOS attacks; however, botnets can't really be stopped by WAFs due to the nature of their IP origins. Attacks such as [Astroturfing](https://en.wikipedia.org/wiki/Astroturfing) allows botnets to spam various APIs and functions in your app and it's hard to prevent without obtaining botnet IP datasets that Pangea offers in partnership with Team Cymru.

## Usage
It's extermely simple to implement the API. In this example it's been created as a util file; however, it can be converted into a middleware to protect a large set of APIs in your application.

The API call to Pangea services occurs in the [src/utils/botDetector.ts](./src/utils/botDetector.ts) and this function is called by 2 APIs `/api/check-current-ip`, `/api/check-given-ip`

To play with the API routes you need to deploy it on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsnpranav%2Fpangea-bot-detection-demo&env=PANGEA_TOKEN,PANGEA_DOMAIN&envDescription=API%20Keys%20can%20be%20obtained%20from%20pangea.cloud%20and%20will%20be%20used%20to%20call%20the%20IP%20intel%20API&envLink=https%3A%2F%2Fconsole.pangea.cloud%2Fservice%2Fip-intel&project-name=with-pangea-bot-detection-demo&repository-name=with-pangea-bot-detection-demo)

Once deployed visit routes:

- `/api/check-current-ip` - will tell your IP is a bot or not
- `/api/check-given-ip?ip=100.12.162.73` - will show that this is a bot IP since `100.12.162.73` is the IP part of a botnet

Based on whether it's a bot or not you can add logic in your application to either show a captcha challenge to your user or just block their request.

A good example to see how this has been implemented would be in the [src/pages/api/check-current-ip.ts](./src/pages/api/check-current-ip.ts)