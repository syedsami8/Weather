$(document).ready(function () {

    var temp = 0,
        farh = 0,
        cel = 0;

    function celToFar(tp,code) {
        temp = tp;
        farh = Math.round(temp * 1.8 + 32);
        cel = Math.round((farh - 32) / 1.8);
    }

    $(".ctof-btn").click(function () {
        if ($(".ctof-btn input").is(":checked")) {
            $(".temp").html(farh + " &deg;F");
        } else {
            $(".temp").html(cel + " &deg;C");
        }
    });

    function err() {
        window.alert("Failed getting weather data\nEnable location for this app!!\nTry refreshing the page!!");
    }

    function getWeatherData(position) {

        $.ajax({
            url: 'https://simple-weather.p.mashape.com/weatherdata?lat=' + position.latitude + '&lng=' + position.longitude,
            type: 'GET',
            data: {},
            dataType: 'json',
            success: function (data) {
                var short = data.query.results.channel,
                    temperature = short.item.condition.temp,
                    code = short.item.condition.text;
                $(".city").html(short.location.city + ", " + short.location.country);
                $(".temp").html("<strong>" + temperature + " &deg;C </strong>");
                $(".code").html(code);
                $(".icon").html("<i class='wi wi-yahoo-" + short.item.condition.code + "'></i>");
                celToFar(temperature,code);
            },
            error: err,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("X-Mashape-Authorization", "TLsUhZrE9kmshJ9XPg0irqZNYgVNp1qpGM0jsnr4p3AmVmae16");
            }
        });
    }

    function success(pos) {
        var co = pos.coords;
        getWeatherData(co);
    }

    navigator.geolocation.getCurrentPosition(success, err);

});