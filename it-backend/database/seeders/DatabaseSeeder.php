<?php

namespace Database\Seeders;

use App\Models\User\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $email = Str::random(6).'@issue-tracking.com';
        $password = Str::random(10);

        print(sprintf("Generated admin with credentials: %s:%s \n", $email, $password));

        User::query()->create([
            'name'     => 'Sh1ne',
            'email'    => $email,
            'role'     => 'admin',
            'password' => Hash::make($password),
        ]);
        // \App\Models\User::factory(10)->create();
    }
}
