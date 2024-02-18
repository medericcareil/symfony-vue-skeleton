<?php

namespace App\Kernel;

/**
 * abstract class Enum
 * @package App\Kernel
 */
abstract class Enum 
{
    /** 
     * @var array|null 
     */
    private static $CACHE_ARRAY = null;

    /**
     * Returns an array of the constants declared in the Enum implementing this helper.
     * @return array
     */
    public static function getConstants(): array
    {
        if (self::$CACHE_ARRAY == null) {
            self::$CACHE_ARRAY = [];
        }
        $calledClass = get_called_class();
        if (!array_key_exists($calledClass, self::$CACHE_ARRAY)) {
            $reflect = new \ReflectionClass($calledClass);
            self::$CACHE_ARRAY[$calledClass] = $reflect->getConstants();
        }
        return self::$CACHE_ARRAY[$calledClass];
    }

    /**
     * Asserts that an Enum's name is valid. Returns false if not valid, and true if valid.
     * @param $name
     * @param bool $strict
     * @return bool
     */
    public static function isValidName($name, bool $strict = false): bool
    {
        $constants = self::getConstants();

        if ($strict) {
            return array_key_exists($name, $constants);
        }

        $keys = array_map('strtolower', array_keys($constants));
        return in_array(strtolower($name), $keys);
    }

    /**
     * Asserts that an Enum's value is valid. Returns false if not valid, and true if valid.
     * @param $value
     * @param bool $strict
     * @return bool
     */
    public static function isValidValue($value, bool $strict = true): bool
    {
        $values = array_values(self::getConstants());

        return in_array($value, $values, $strict);
    }

    /**
     * Returns verified constant's value for a given name (in string form), if the name is invalid, returns false.
     * @param string $name
     * @return string|false the verified constant value
     */
    public static function fromString(string $name)
    {
        if (!self::isValidName($name, $strict = true)) {
            return null;
        }

        $constants = self::getConstants();
        return $constants[$name];
    }

    /**
     * Returns the verified constant's name for a given value (in string form), if the value is invalid, returns false.
     * @param string $value
     * @return string|false the verified constant name
     */
    public static function toString(string $value)
    {
        if (!self::isValidValue($value, $strict = true)) {
            return null;
        }

        return array_search($value, self::getConstants());
    }
}
