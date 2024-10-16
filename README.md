# frontend

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# components랑 view 구분
## [management(경영지표)]
### - view
#####  localhost:8080/management
### -components
#####  localhost:8080/management/stock
#####  localhost:8080/management/month-sales
#####  localhost:8080/management/press/day, week, month
#####  localhost:8080/management/welding/day, week, month
## [engineering(엔지니어링지표)]
### - view
##### localhost:8080/engineering/press
##### localhost:8080/engineering/welding
### -components
#####  localhost:8080/engineering/realtime-press/select
#####  localhost:8080/engineering/realtime-press/insert
#####  localhost:8080/engineering/realtime-welding/select
#####  localhost:8080/engineering/realtime-welding/insert
#####  localhost:8080/engineering/realtime-press/trend
#####  localhost:8080/engineering/realtime-welding/trend
## [model_management(모델관리)]
### -view 
#####  localhost:8080/model-management
### -components
#####  localhost:8080/model-management/model-select
#####  localhost:8080/model-management/model-select/detail
## [model_deployment(모델배포)]
### -view
#####  localhost:8080/model-deployment
### -components
#####  localhost:8080/model-deployment/process-select
#####  localhost:8080/model-deployment/model-insert
#####  localhost:8080/model-deployment/model-select
#####  localhost:8080/model-deployment/model-detail
#####  localhost:8080/model-deployment/model-apply
## [social(소셜분석)]
### -view
#####  localhost:8080/social
### -components
#####  localhost:8080/social/keyword
#####  localhost:8080/social/np-ratio/all
#####  localhost:8080/social/np-ratio/car
#####  localhost:8080/social/np-ratio/journal
#####  localhost:8080/social/count/journal
## [user_management(사용자관리)]
### -view
#####  localhost:8080/user-management
### -components
#####  localhost:8080/user-management/user-search
#####  localhost:8080/user-management/user-add
#####  localhost:8080/user-management/user
#####  localhost:8080/user-management/user-detail
#####  localhost:8080/user-management/user-save
#####  localhost:8080/user-management/group-search
#####  localhost:8080/user-management/group
#####  localhost:8080/user-management/group-list
#####  localhost:8080/user-management/group-add
