<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\UserController;

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');

});


Route::controller(TodoController::class)->group(function () {
    Route::get('todos', 'index');
    Route::post('todo', 'store');
    Route::get('todo/{id}', 'show');
    Route::put('todo/{id}', 'update');
    Route::delete('todo/{id}', 'destroy');
}); 




// Route::middleware('auth:api')->get('/user', 'UserController@getUser');
Route::get("/getUserInfo/{id?}", [UserController::class, 'getUserInfo']);
Route::get("/getUserInfoByEmail/{email?}", [UserController::class, 'getUserInfoByEmail']);

Route::post('/update_profile', [UserController::class, 'updateProfile']);

// Route::get('/get_blocked/{id}', [UserController::class, 'getBlocked']);

Route::get('/blocked-users', [UserController::class, 'getBlockedUsers']);
Route::get("/favorites/{id?}", [UserController::class, 'getFavorites']);


Route::get('users/filter', [UserController::class, 'filter']);

Route::middleware('auth:api')->post('photos', [UserController::class, 'upload']);


Route::middleware('auth:api')->get('/opposite-gender', 'UserController@oppositeGender');

Route::post('/users/{user_id}/{type}', 'UserController@favoriteOrBlock');




