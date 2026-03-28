from datetime import date

from django.core.management.base import BaseCommand

from octofit_tracker.models import Activity, LeaderboardEntry, Team, User, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clear model-backed data first so repeated runs remain deterministic.
        Team.members.through.objects.all().delete()
        Workout.suggested_for.through.objects.all().delete()
        LeaderboardEntry.objects.all().delete()
        Activity.objects.all().delete()
        Workout.objects.all().delete()
        Team.objects.all().delete()
        User.objects.all().delete()

        Team.objects.bulk_create(
            [
                Team(id=1, name='Team Marvel'),
                Team(id=2, name='Team DC'),
            ]
        )

        User.objects.create_user(
            id=1,
            username='spiderman',
            email='spiderman@marvel.com',
            password='octofit123',
            first_name='Spider',
            last_name='Man',
        )
        User.objects.create_user(
            id=2,
            username='ironman',
            email='ironman@marvel.com',
            password='octofit123',
            first_name='Iron',
            last_name='Man',
        )
        User.objects.create_user(
            id=3,
            username='wonderwoman',
            email='wonderwoman@dc.com',
            password='octofit123',
            first_name='Wonder',
            last_name='Woman',
        )
        User.objects.create_user(
            id=4,
            username='batman',
            email='batman@dc.com',
            password='octofit123',
            first_name='Bruce',
            last_name='Wayne',
        )

        Team.members.through.objects.bulk_create(
            [
                Team.members.through(team_id=1, user_id=1),
                Team.members.through(team_id=1, user_id=2),
                Team.members.through(team_id=2, user_id=3),
                Team.members.through(team_id=2, user_id=4),
            ]
        )

        Activity.objects.bulk_create(
            [
                Activity(
                    id=1,
                    user_id=1,
                    team_id=1,
                    type='Running',
                    duration=30,
                    calories=250,
                    date=date(2026, 3, 24),
                ),
                Activity(
                    id=2,
                    user_id=2,
                    team_id=1,
                    type='Cycling',
                    duration=45,
                    calories=420,
                    date=date(2026, 3, 25),
                ),
                Activity(
                    id=3,
                    user_id=3,
                    team_id=2,
                    type='Swimming',
                    duration=60,
                    calories=500,
                    date=date(2026, 3, 26),
                ),
                Activity(
                    id=4,
                    user_id=4,
                    team_id=2,
                    type='Yoga',
                    duration=40,
                    calories=220,
                    date=date(2026, 3, 27),
                ),
            ]
        )

        Workout.objects.create(
            id=1,
            name='Cardio Blast',
            description='Intervals alternating sprint and jog for improved endurance.',
        )
        Workout.objects.create(
            id=2,
            name='Strength Builder',
            description='Compound movements focused on progressive overload.',
        )

        Workout.suggested_for.through.objects.bulk_create(
            [
                Workout.suggested_for.through(workout_id=1, user_id=1),
                Workout.suggested_for.through(workout_id=1, user_id=2),
                Workout.suggested_for.through(workout_id=2, user_id=3),
                Workout.suggested_for.through(workout_id=2, user_id=4),
            ]
        )

        LeaderboardEntry.objects.bulk_create(
            [
                LeaderboardEntry(id=1, user_id=1, team_id=1, score=190, rank=1),
                LeaderboardEntry(id=2, user_id=3, team_id=2, score=175, rank=2),
                LeaderboardEntry(id=3, user_id=2, team_id=1, score=160, rank=3),
                LeaderboardEntry(id=4, user_id=4, team_id=2, score=140, rank=4),
            ]
        )

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with ORM test data.'))
