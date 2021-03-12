<?php


namespace App\Http\Responses\User;

class GetUserResponse
{
    private $user;
    private $projects;

    public function __construct($user)
    {
        $this->user = $user;
        $this->projects = $user->projects->map(\Closure::fromCallable([$this, 'mapProject']));
    }

    public static function from($user)
    {
        return new static($user);
    }

    public function toArray()
    {
        return [
            'user' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'email' => $this->user->email,
                'role' => $this->user->role,
                'status' => $this->user->status,
                'projects' => $this->projects,
                'created_at' => $this->user->created_at,
            ]
        ];
    }

    private function mapProject($project)
    {
        return [
            'id' => $project->id,
            'name' => $project->name,
            'status' => $project->status,
            'created_at' => $project->created_at,
        ];
    }
}
