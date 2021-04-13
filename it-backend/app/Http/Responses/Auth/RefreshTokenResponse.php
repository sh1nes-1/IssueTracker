<?php


namespace App\Http\Responses\Auth;

class RefreshTokenResponse
{
    private $access_token;
    private $refresh_token;
    private $user;

    public function __construct($access_token, $refresh_token, $user)
    {
        $this->access_token = $access_token;
        $this->refresh_token = $refresh_token;
        $this->user = $user;
    }

    public static function from($access_token, $refresh_token, $user)
    {
        return new static($access_token, $refresh_token, $user);
    }

    public function toArray()
    {
        return [
            'access_token' => $this->access_token,
            'refresh_token' => $this->refresh_token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => [
                'name' => $this->user->name,
                'email' => $this->user->email,
                'role' => $this->user->role,
            ]
        ];
    }
}
