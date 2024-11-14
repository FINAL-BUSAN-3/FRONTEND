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
#####  ec2-18-215-52-54.compute-1.amazonaws.com:8080/management
### -components
#####  ec2-18-215-52-54.compute-1.amazonaws.com:8080/management/stock
#####  ec2-18-215-52-54.compute-1.amazonaws.com:8080/management/month-sales
#####  ec2-18-215-52-54.compute-1.amazonaws.com:8080/management/press/day, week, month
#####  ec2-18-215-52-54.compute-1.amazonaws.com:8080/management/welding/day, week, month
## [engineering(엔지니어링지표)]
### - view
##### ec2-18-215-52-54.compute-1.amazonaws.com:8080/engineering/press
##### ec2-18-215-52-54.compute-1.amazonaws.com:8080/engineering/welding
### -components
#####  ec2-18-215-52-54.compute-1.amazonaws.com:8080/engineering/realtime-press/select
#####  ec2-18-215-52-54.compute-1.amazonaws.com:8080/engineering/realtime-press/insert
#####  ec2-18-215-52-54.compute-1.amazonaws.com:8080/engineering/realtime-welding/select
#####  ec2-18-215-52-54.compute-1.amazonaws.com:8080/engineering/realtime-welding/insert
#####  ec2-18-215-52-54.compute-1.amazonaws.com:8080/engineering/realtime-press/trend
#####  ec2-18-215-52-54.compute-1.amazonaws.com:8080/engineering/realtime-welding/trend
## [model_management(모델관리)]
### -view 
#####  ec2-18-215-52-54.compute-1.amazonaws.com:8080/model-management
### -components
#####  ec2-18-215-52-54.compute-1.amazonaws.com:8080/model-management/model-select
#####  ec2-18-215-52-54.compute-1.amazonaws.com:8080/model-management/model-select/detail
## [model_deployment(모델배포)]
### -view
#####  ec2-18-215-52-54.compute-1.amazonaws.com:8080/model-deployment
### -components
#####  ec2-18-215-52-54.compute-1.amazonaws.com:8080/model-deployment/process-select
#####  ec2-18-215-52-54.compute-1.amazonaws.com:8080/model-deployment/model-insert
#####  ec2-18-215-52-54.compute-1.amazonaws.com:8080/model-deployment/model-select
#####  ec2-18-215-52-54.compute-1.amazonaws.com:8080/model-deployment/model-detail
#####  ec2-18-215-52-54.compute-1.amazonaws.com:8080/model-deployment/model-apply
## [social(소셜분석)]
### -view
#####  ec2-18-215-52-54.compute-1.amazonaws.com:8080/social
### -components
#####  ec2-18-215-52-54.compute-1.amazonaws.com:8080/social/keyword
#####  ec2-18-215-52-54.compute-1.amazonaws.com:8080/social/np-ratio/all
#####  ec2-18-215-52-54.compute-1.amazonaws.com:8080/social/np-ratio/car
#####  ec2-18-215-52-54.compute-1.amazonaws.com:8080/social/np-ratio/journal
#####  ec2-18-215-52-54.compute-1.amazonaws.com:8080/social/count/journal
## [user_management(사용자관리)]
### -view
#####  ec2-18-215-52-54.compute-1.amazonaws.com:8080/user-management
### -components
#####  ec2-18-215-52-54.compute-1.amazonaws.com:8080/user-management/user-search
#####  ec2-18-215-52-54.compute-1.amazonaws.com:8080/user-management/user-add
#####  ec2-18-215-52-54.compute-1.amazonaws.com:8080/user-management/user
#####  ec2-18-215-52-54.compute-1.amazonaws.com:8080/user-management/user-detail
#####  ec2-18-215-52-54.compute-1.amazonaws.com:8080/user-management/user-save
#####  ec2-18-215-52-54.compute-1.amazonaws.com:8080/user-management/group-search
#####  ec2-18-215-52-54.compute-1.amazonaws.com:8080/user-management/group
#####  ec2-18-215-52-54.compute-1.amazonaws.com:8080/user-management/group-list
#####  ec2-18-215-52-54.compute-1.amazonaws.com:8080/user-management/group-add
