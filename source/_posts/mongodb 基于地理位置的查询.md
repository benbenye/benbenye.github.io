---
title: mongodb 基于地理位置的查询
date: 2016-01-08 15:33
---
####需求：
查询结果按照到某一点的距离排序。

####schema定义：
```javascript
var UserSchema = new Schema({
  ...
  location:[Number]    //经纬度数组
});
<!--more-->
UserSchema.index({'location': '2dsphere'});
```
####查询语句
```javascript
User.find({
  location: {
    $nearSphere: {
      $geometry: {
        type : "Point",
        coordinates : [116.411190, 40.005540]
      }
    }
  }
});
```

查询出来的结果是 user 表 location 距离坐标[116.411190, 40.005540]由近到远排序的，**不能同时使用其他排序字段**。

######参考：
http://stackoverflow.com/questions/24297556/mongoose-aggregation-with-geonear
https://docs.mongodb.org/manual/reference/operator/query/nearSphere/
http://tech.meituan.com/lucene-distance.html
