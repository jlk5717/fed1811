app.service('getDataService', function($http){
    this.getCall = (urlData) => {
        return $http.get(urlData);
        //console.log($http.get(urlData));
    }
    this.updateCall = (urlData, dataInput) => {
       return $http({
            method: "PATCH",
            url: urlData,
            data: dataInput
       })
    }

})