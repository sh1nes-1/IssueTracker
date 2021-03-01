<?php

namespace App\Models\Project\Environment;

use App\Models\Project\Project;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectEnvironment extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'name',
        'secret_key',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function isUserAuthorized($user_id)
    {
        return $this->project->user->id === $user_id;
    }
}
