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

// http://localhost:8000?info=test
Route::get('/', function () {
    event(new PaymentSuccess([
        'UserId' => 3,
        'orderId' => 100,
        'status' => 'success',
        'info' => request('info', 'Hello, World!')
    ]));
    dd('Done');
});
