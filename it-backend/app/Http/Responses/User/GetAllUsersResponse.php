<?php


namespace App\Http\Responses\User;

class GetAllUsersResponse
{
    private $users;
    private $total_count;

    public function __construct($users, $total_count)
    {
        $this->users = $users->map(\Closure::fromCallable([$this, 'mapUser']));
        $this->total_count = $total_count;
    }

    public static function from($users, $total_count)
    {
        return new static($users, $total_count);
    }

    public function toArray()
    {
        return [
            'users' => $this->users,
            'total_count' => $this->total_count,
        ];
    }

    private function mapUser($user)
    {
        $projects = $user->projects->map(\Closure::fromCallable([$this, 'mapProject']));
        return [
            'id'         => $user->id,
            'name'       => $user->name,
            'email'      => $user->email,
            'role'       => $user->role,
            'status'     => $user->status,
            'projects'   => $projects,
            'created_at' => $user->created_at,
        ];
    }

    private function mapProject($project)
    {
        return [
            'id' => $project->id,
            'name' => $project->name,
            'created_at' => $project->created_at,
        ];
    }
}
