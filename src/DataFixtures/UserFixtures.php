<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Enum\RolesEnum;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    /**
     * @var UserPasswordHasherInterface  
     */
    private UserPasswordHasherInterface $hasher;

    public function __construct(UserPasswordHasherInterface $hasher)
    {
        $this->hasher = $hasher;
    }

    public function load(ObjectManager $manager): void
    {
        $user = (new User())
            ->setEmail('michel@exemple.fr')
            ->setRoles([RolesEnum::SUPERADMIN])
            ->setFirstName('Michel')
            ->setLastName('Dumas')
            ->setAddress('30 rue du Pin')
            ->setCity('Rouen')
            ->setZipCode('76000')
        ;
        $user->setPassword($this->hasher->hashPassword($user, 'michel'));
        $manager->persist($user);

        $manager->flush();
    }
}
