<?php


namespace App\Http\Responses\Auth;

class RefreshTokenResponse
{
    private $access_token;
    private $refresh_token;

    public function __construct($access_token, $refresh_token)
    {
        $this->access_token = $access_token;
        $this->refresh_token = $refresh_token;
    }

    public static function from($access_token, $refresh_token)
    {
        return new static($access_token, $refresh_token);
    }

    public function toArray()
    {
        return [
            'access_token' => $this->access_token,
            'refresh_token' => $this->refresh_token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
        ];
    }
}
