var app = angular.module('myApp', []);
app.controller('zebpayCtrl', function ($scope, $http, $interval) {
    
    //Zebpay BTC API
    function ZebpayAPI() {
        $http.get("https://www.zebapi.com/api/v1/market/ticker-new/btc/inr")
            .then(function (zebpayResults) {
                $scope.zebpay_buy_inr = zebpayResults.data.buy;
        })
    }
    $interval(ZebpayAPI, 15000);

    //Coindesk BTC API
    function CoindeskAPI() {
        $http.get("https://api.coindesk.com/v1/bpi/currentprice/USD.json")
            .then(function (coindeskResults) {
                $scope.coindesk_buy_usd = coindeskResults.data.bpi.USD.rate_float;
                $scope.coindesk_buy_inr = Math.round($scope.coindesk_buy_usd * $scope.oneUSDtoINR);
            })
    }
    $interval(CoindeskAPI, 15000);

    //Converting USD to INR using FIXER API
    function USDtoINR() {
        $http.get("https://free.currencyconverterapi.com/api/v5/convert?q=USD_INR")
            .then(function (USDtoINRResults) {
                $scope.oneUSDtoINR = USDtoINRResults.data.results.USD_INR.val;
                console.log($scope.oneUSDtoINR);
            })
    }
    //Calling at start
    USDtoINR();
    $interval(USDtoINR, 3600000);
});