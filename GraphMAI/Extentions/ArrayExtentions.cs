namespace GraphMAI.Extentions
{
    public static class ArrayExtentions
    {
        public static int MaxValueIndex(this int[] nums)
        {
            var max = nums[0];
            var maxIndex = 0;
            for (int i = 0; i < nums.Length; i++)
            {
                if (max < nums[i])
                {
                    maxIndex = i;
                    max = nums[i];
                }
            }

            return maxIndex;
        }
    }
}
