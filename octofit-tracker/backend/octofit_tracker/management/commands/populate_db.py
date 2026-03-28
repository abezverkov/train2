from django.core.management.base import BaseCommand
from django.conf import settings
from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        client = MongoClient('localhost', 27017)
        db = client['octofit_db']

        # Drop collections if they exist
        db.users.drop()
        db.teams.drop()
        db.activities.drop()
        db.leaderboard.drop()
        db.workouts.drop()

        # Create unique index on email for users
        db.users.create_index([('email', 1)], unique=True)

        # Teams
        teams = [
            {'name': 'Team Marvel'},
            {'name': 'Team DC'}
        ]
        team_ids = db.teams.insert_many(teams).inserted_ids

        # Users (superheroes)
        users = [
            {'name': 'Spider-Man', 'email': 'spiderman@marvel.com', 'team': team_ids[0]},
            {'name': 'Iron Man', 'email': 'ironman@marvel.com', 'team': team_ids[0]},
            {'name': 'Wonder Woman', 'email': 'wonderwoman@dc.com', 'team': team_ids[1]},
            {'name': 'Batman', 'email': 'batman@dc.com', 'team': team_ids[1]},
        ]
        user_ids = db.users.insert_many(users).inserted_ids

        # Activities
        activities = [
            {'user': user_ids[0], 'activity': 'Running', 'duration': 30},
            {'user': user_ids[1], 'activity': 'Cycling', 'duration': 45},
            {'user': user_ids[2], 'activity': 'Swimming', 'duration': 60},
            {'user': user_ids[3], 'activity': 'Yoga', 'duration': 40},
        ]
        db.activities.insert_many(activities)

        # Workouts
        workouts = [
            {'name': 'Cardio Blast', 'suggested_for': 'Team Marvel'},
            {'name': 'Strength Builder', 'suggested_for': 'Team DC'}
        ]
        db.workouts.insert_many(workouts)

        # Leaderboard
        leaderboard = [
            {'team': 'Team Marvel', 'points': 150},
            {'team': 'Team DC', 'points': 120}
        ]
        db.leaderboard.insert_many(leaderboard)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
