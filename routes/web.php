<?php

use App\Events\PaymentSuccess;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
use Illuminate\Support\Facades\Redis;

// http://localhost:8000/
Route::get('/', function () {
    return view('welcome');
});

// http://localhost:8000/fire-event?info=test
Route::get('/fire-event',function(){
    event(new PaymentSuccess( [
        'UserId'=>3,
        'orderId'=>100,
        'status'=>'success',
        'info'=>request('info')
    ]));
});
