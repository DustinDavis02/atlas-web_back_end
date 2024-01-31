#!/usr/bin/env python3
import unittest
from unittest.mock import patch, Mock, PropertyMock
from parameterized import parameterized
from client import GithubOrgClient


class TestGithubOrgClient(unittest.TestCase):
    """Testing the GithubOrgClient class."""

    @parameterized.expand([
        ("google",),
        ("abc",),
    ])
    @patch('client.get_json')
    def test_org(self, org_name, mock_get_json):
        """Testing GithubOrgClient.org returns the correct value."""
        mock_get_json.return_value = {"name": org_name}
        github_org_client = GithubOrgClient(org_name)
        expected_result = {"name": org_name}

        self.assertEqual(github_org_client.org, expected_result)
        mock_get_json.assert_called_once_with(
            f'https://api.github.com/orgs/{org_name}'
        )

    def test_public_repos_url(self):
        """Testing property"""
        json_payload = {
            "repos_url": "https://api.github.com/orgs/google/repos"
        }
        with patch('client.GithubOrgClient.org',
                   new_callable=PropertyMock) as mock_org:
            mock_org.return_value = json_payload
            github_org_client = GithubOrgClient("google")
            self.assertEqual(
                github_org_client._public_repos_url, json_payload["repos_url"]
            )

    @patch('client.get_json')
    def test_public_repos(self, mock_get_json):
        """Testing GithubOrgClient.public_repos."""
        mock_repos_payload = [{"name": "repo1"}, {"name": "repo2"}]
        mock_get_json.return_value = mock_repos_payload

        mock_repos_url = "https://api.github.com/orgs/google/repos"

        with patch(
            'client.GithubOrgClient._public_repos_url',
            new_callable=PropertyMock
        ) as mock_public_repos_url:
            mock_public_repos_url.return_value = mock_repos_url
            github_org_client = GithubOrgClient("google")
            self.assertEqual(
                github_org_client.public_repos, ["repo1", "repo2"]
            )

            mock_public_repos_url.assert_called_once()
            mock_get_json.assert_called_once_with(mock_repos_url)

    @parameterized.expand([
        ({"license": {"key": "my_license"}}, "my_license", True),
        ({"license": {"key": "other_license"}}, "my_license", False),
    ])
    def test_has_license(self, repo, license_key, expected):
        """Testing GithubOrgClient.has_license."""
        github_org_client = GithubOrgClient("google")
        self.assertEqual(
            github_org_client.has_license(repo, license_key), expected
        )
