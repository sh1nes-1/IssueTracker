<?php

namespace App\Http\Middleware;

use App\Models\Project\Environment\ProjectEnvironment;
use Closure;
use Illuminate\Http\Request;

class VerifyEnvironmentSecret
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
        $environment_secret = $request->header('environment_secret');
        if ($environment_secret) {
            $environment = ProjectEnvironment::query()->where('secret_key', $environment_secret)->first();
            if ($environment) {
                $request->merge([
                    'project_id' => $environment->project_id,
                    'project_environment_id' => $environment->id,
                ]);

                return $next($request);
            }
        }

        abort(401, 'Unauthorized');
    }
}
