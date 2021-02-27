<?php

namespace App\Models\Project;

use App\Models\Project\Environment\ProjectEnvironment;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
    ];

    public function environments()
    {
        return $this->hasMany(ProjectEnvironment::class);
    }

    public function defaultEnvironment()
    {
        return $this->environments()->orderBy('id')->first();
    }
}
