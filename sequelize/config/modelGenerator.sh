npx sequelize-cli model:generate --name users --attributes fullName:string,email:string,age:integer,isEmailverified:boolean,address:jsonb,roleId:uuid,bio:text

# go to \sequelize> <paste above code to create model and mingration
# modeify the model according to your requirements