<?php

namespace App\Http\Controllers\Project;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\CreateProjectRequest;
use App\Http\Requests\Project\GetAllProjectsRequest;

class ProjectController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth.check');
    }

    public function index(GetAllProjectsRequest $request)
    {
        return $request->perform();
    }

    public function create(CreateProjectRequest $request)
    {
        return $request->perform();
    }
}
