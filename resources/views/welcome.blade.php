<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Laravel</title>
</head>
<body class="antialiased">

<h1>Messages</h1>
<ul>
    <li v-repeat="messages: message">@{{message}}</li>
</ul>
<script src="//cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.js"></script>

<script src="//cdnjs.cloudflare.com/ajax/libs/vue/0.12.15/vue.min.js"></script>
<script>
    var socket = io("http://localhost:3000");
    new Vue({
        el: 'body',
        data: {
            messages: []
        },
        ready: function () {
            socket.on('test', (data) => {
                console.log(data);
                this.messages.push(data.info);
            });
        }
    });
</script>
</body>
</html>
