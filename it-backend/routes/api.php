<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Issue\IssueController;
use App\Http\Controllers\Project\Environment\EnvironmentController;
use App\Http\Controllers\Project\ProjectController;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'api', 'prefix' => 'v1'], function () {
    Route::group(['prefix' => 'auth'], function () {
        Route::post('login', [AuthController::class, 'login']);
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('refresh', [AuthController::class, 'refresh']);
        Route::get('profile', [AuthController::class, 'profile']);
    });

    Route::group(['prefix' => 'users'], function () {
        Route::get('/', [UserController::class, 'index']);
        Route::post('/', [UserController::class, 'create']);
        Route::get('/{id}', [UserController::class, 'get']);
        Route::post('/{id}', [UserController::class, 'update']);
    });

    Route::group(['prefix' => 'projects'], function () {
        Route::get('/', [ProjectController::class, 'index']);
        Route::post('/', [ProjectController::class, 'create']);
        Route::group(['prefix' => '{id}'], function () {
            Route::get('/', [ProjectController::class, 'get']);
            Route::post('/', [ProjectController::class, 'update']);
            Route::delete('/', [ProjectController::class, 'delete']);
        });
    });

    Route::group(['prefix' => 'environments'], function () {
        Route::post('/', [EnvironmentController::class, 'create']);
        Route::post('/{id}', [EnvironmentController::class, 'update']);
        Route::get('/{id}', [EnvironmentController::class, 'get']);
        Route::post('/{id}/generateNewSecret', [EnvironmentController::class, 'generateNewSecret']);
    });

    Route::group(['prefix' => 'issues'], function () {
        Route::get('/', [IssueController::class, 'index']);
        Route::get('/{id}', [IssueController::class, 'get']);
        Route::post('/', [IssueController::class, 'createEvent']);
        Route::post('/resolve', [IssueController::class, 'resolve']);
        Route::post('/ignore', [IssueController::class, 'ignore']);
    });
});
