# Who Sings

Web

> https://who-sings-illbexyz.vercel.app

Mobile Apps (Expo)

> https://expo.dev/@illbexyz/who-sings

## Develop

Install dependencies using `yarn`:

```
$ yarn
```

Start the local expo dev server using:

```
$ yarn start
```

## Develop API

By default the application will target the API deployed at: https://who-sings-illbexyz.vercel.app/api.

If you want to start a local server and target it, you should edit [src/config/api.ts](https://github.com/illbexyz/who-sings/blob/main/src/config/api.ts) and replace the `apiBaseUrl` with:

```typescript
export const apiBaseUrl = "http://localhost:3000/api";
```

You will also need a Musixmatch API Key. You can get one from https://developer.musixmatch.com.

Create a `.env.local` file containing the API key:

```
$ echo MUSIXMATCH_API_KEY=YOUR_API_KEY_HERE > .env.local
```

Finally, to run the local server:

```
$ yarn start:api
```
