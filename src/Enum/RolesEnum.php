<?php

namespace App\Enum;

use App\Kernel\Enum;

/**
 * abstract class RolesEnum
 * @package App\Enum
 */
abstract class RolesEnum extends Enum {
    public const SUPERADMIN = 'ROLE_SUPER_ADMIN';
    public const ADMIN = 'ROLE_ADMIN';
    public const USER = 'ROLE_USER';
}
