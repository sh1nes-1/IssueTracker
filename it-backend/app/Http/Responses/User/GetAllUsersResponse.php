<?php


namespace App\Http\Responses\User;

class GetAllUsersResponse
{
    private $users;

    public function __construct($users)
    {
        $this->users = $users->map(\Closure::fromCallable([$this, 'mapUser']));
    }

    public static function from($users)
    {
        return new static($users);
    }

    public function toArray()
    {
        return [
            'users' => $this->users,
        ];
    }

    private function mapUser($user)
    {
        return [
            'id'         => $user->id,
            'name'       => $user->name,
            'email'      => $user->email,
            'status'     => $user->status,
            'role'       => $user->role,
            'created_at' => $user->created_at,
        ];
    }
}
