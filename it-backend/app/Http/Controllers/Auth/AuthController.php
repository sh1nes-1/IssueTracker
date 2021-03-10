<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\ProfileRequest;
use App\Http\Requests\Auth\RefreshTokenRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['only' => ['refresh']]);
        $this->middleware('auth.check', ['only' => ['profile', 'logout']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @param LoginRequest $request
     * @return JsonResponse
     */
    public function login(LoginRequest $request)
    {
        return $request->perform();
    }

    /**
     * Get the authenticated User.
     *
     * @param ProfileRequest $request
     * @return JsonResponse
     */
    public function profile(ProfileRequest $request)
    {
        return $request->perform();
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @param RefreshTokenRequest $request
     * @return JsonResponse
     */
    public function refresh(RefreshTokenRequest $request)
    {
        return $request->perform();
    }
}
