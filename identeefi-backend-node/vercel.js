// {
//   "version" : 2,
//   "builds" : [
//     {
//       "src":"*.js",
//       "use":"@vercel/node"
//     }
//   ],
//   "routes":[
//     {
//       "src":"/(.*)",
//       "dest":"/"
//     }
//   ]
// }


{
  "version"; 2,
  "builds"; [
    {
      "src": "*.js",
      "use": "@vercel/node"
    }
  ],
  "routes"; [
    {
      "src": "/(.*)",
      "dest": "/"
    }
  ],
  "env"; {
    // "PG_HOST"; "@pg_host",
    "PG_PORT"; "@pg_port",
    "PG_USER"; "@pg_user",
    "PG_PASSWORD"; "@pg_password",
    "PG_DATABASE"; "@pg_database",
    "PORT"; "@port"
  }
}