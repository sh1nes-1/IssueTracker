<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\CreateUserRequest;
use App\Http\Requests\User\GetAllUsersRequest;
use App\Http\Requests\User\GetUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth.check');
    }

    public function index(GetAllUsersRequest $request)
    {
        return $request->perform();
    }

    public function create(CreateUserRequest $request)
    {
        return $request->perform();
    }

    public function get(GetUserRequest $request)
    {
        return $request->perform();
    }

    public function update(UpdateUserRequest $request)
    {
        return $request->perform();
    }
}
