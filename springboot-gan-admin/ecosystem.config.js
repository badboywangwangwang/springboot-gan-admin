module.exports = {
  apps: [
    {
      name: 'springboot-gan-admin',
      script: 'springboot-gan-springboot-gan-admin-server.js'
    },
  ],
  deploy: {
    production: {
      user: 'root',
      host: '127.0.0.1',
      ref: 'origin/main',
      repo: 'git@github.com:badboywangwangwang/springboot-gan-admin.git',
      path: '/workspace/admin',
      'post-deploy': 'git reset --hard && git checkout main && git pull && npm i --production=false && pm2 startOrReload ecosystem.config.js', // -production=false 下载全量包
      env: {
        NODE_ENV: 'production'
      }
    }
  }
}
