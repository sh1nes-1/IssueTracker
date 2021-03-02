<?php

namespace App\Http\Controllers\Project\Environment;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\Environment\CreateEnvironmentRequest;
use App\Http\Requests\Project\Environment\GenerateNewSecretRequest;
use App\Http\Requests\Project\Environment\GetEnvironmentRequest;
use App\Http\Requests\Project\Environment\UpdateEnvironmentRequest;
use Illuminate\Http\Request;

class EnvironmentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth.check');
    }

    public function get(GetEnvironmentRequest $request)
    {
        return $request->perform();
    }

    public function create(CreateEnvironmentRequest $request)
    {
        return $request->perform();
    }

    public function update(UpdateEnvironmentRequest $request)
    {
        return $request->perform();
    }

    public function generateNewSecret(GenerateNewSecretRequest $request)
    {
        return $request->perform();
    }
}
