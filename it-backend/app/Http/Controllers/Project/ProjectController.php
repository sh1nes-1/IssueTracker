<?php

namespace App\Http\Controllers\Project;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\CreateProjectRequest;
use App\Http\Requests\Project\GetAllProjectsRequest;
use App\Http\Requests\Project\GetProjectRequest;
use App\Http\Requests\Project\UpdateProjectRequest;

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

    public function get(GetProjectRequest $request)
    {
        return $request->perform();
    }

    public function update(UpdateProjectRequest $request)
    {
        return $request->perform();
    }
}
