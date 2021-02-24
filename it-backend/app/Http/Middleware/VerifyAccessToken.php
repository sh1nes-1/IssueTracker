<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class VerifyAccessToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if (!auth()->check()) {
            abort(401, 'Unauthorized');
        }

        $payload = auth()->payload();
        if ($payload) {
            $is_authorized = $payload->get('type') != 'refresh_token';
            if (!$is_authorized) {
                abort(401, 'Unauthorized');
            }
        }

        return $next($request);
    }
}
