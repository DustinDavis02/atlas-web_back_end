#!/usr/bin/env python3
import unittest
from unittest.mock import patch, Mock
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
        mock_get_json.assert_called_once_with(f'https://api.github.com/orgs/{org_name}')