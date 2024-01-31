#!/usr/bin/env python3
"""Unittests for utils module."""
import unittest
from parameterized import parameterized
from utils import access_nested_map, get_json, memoize
from unittest.mock import patch, Mock


class TestAccessNestedMap(unittest.TestCase):
    """Testing function access_nested_map."""

    @parameterized.expand([
        ({"a": 1}, ("a",), 1),
        ({"a": {"b": 2}}, ("a",), {"b": 2}),
        ({"a": {"b": 2}}, ("a", "b"), 2),
    ])
    def test_access_nested_map(self, nested_map, path, expected):
        """Testing access_nested_map function."""
        self.assertEqual(access_nested_map(nested_map, path), expected)

    @parameterized.expand([
        ({}, ("a",), "a"),
        ({"a": 1}, ("a", "b"), "b")
    ])
    def test_access_nested_map_exception(self,
        nested_map, path, expected_message):
        """Testing the function raises KeyError for specific inputs."""
        with self.assertRaises(KeyError) as context:
            access_nested_map(nested_map, path)
        self.assertEqual(str(context.exception).strip("'"), expected_message)


class TestGetJson(unittest.TestCase):
    """Testing function get_json."""

    @parameterized.expand([
        ("http://example.com", {"payload": True}),
        ("http://holberton.io", {"payload": False}),
    ])
    def test_get_json(self, test_url, test_payload):
        """Testing get_json returns expected result without making HTTP calls."""
        with patch('requests.get') as mock_requests_get:
            mock_requests_get.return_value = Mock(json=lambda: test_payload)
            self.assertEqual(get_json(test_url), test_payload)
            mock_requests_get.assert_called_once_with(test_url)


class TestMemoize(unittest.TestCase):
    """Testing memoize decorator."""

    def test_memoize(self):
        """Testing memoize caches the result of a method."""
        class TestClass:
            def a_method(self):
                return 42

            @memoize
            def a_property(self):
                return self.a_method()

        with patch.object(TestClass, 'a_method', return_value=42) as mocked_method:
            test_instance = TestClass()
            first_result = test_instance.a_property
            second_result = test_instance.a_property
            self.assertEqual(first_result, 42)
            self.assertEqual(second_result, 42)
            mocked_method.assert_called_once()
