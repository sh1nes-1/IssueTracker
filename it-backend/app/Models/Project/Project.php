<?php

namespace App\Models\Project;

use App\Models\Issue\Issue;
use App\Models\Project\Environment\ProjectEnvironment;
use App\Models\User\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function environments()
    {
        return $this->hasMany(ProjectEnvironment::class);
    }

    public function defaultEnvironment()
    {
        return $this->environments()->orderBy('id')->first();
    }

    public function issues()
    {
        return $this->hasManyThrough(Issue::class, ProjectEnvironment::class);
    }
}
