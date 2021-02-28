<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::query()->create([
            'name'     => 'Sh1ne',
            'email'    => 'admin@issue-tracking.com',
            'password' => Hash::make('password'),
        ]);
        // \App\Models\User::factory(10)->create();
    }
}
