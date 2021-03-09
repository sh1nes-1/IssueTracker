<?php


namespace App\Http\Responses\User;

class UpdateUserResponse
{
    private $user;

    public function __construct($user)
    {
        $this->user = $user;
    }

    public static function from($user)
    {
        return new static($user);
    }

    public function toArray()
    {
        return [
            'message' => 'User updated successfully',
            'project' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'email' => $this->user->email,
                'role' => $this->user->role,
                'status' => $this->user->status,
            ]
        ];
    }
}
