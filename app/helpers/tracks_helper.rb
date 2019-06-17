module TracksHelper
  def time_as_str(ms)
    secs, ms = ms.divmod(1000)
    mins, secs = secs.divmod(60)
    hours, mins = mins.divmod(60)
    s = format("%d:%d:%02d", hours, mins, secs)

    if hours.positive?
      s
    elsif mins.positive?
      s[2..-1]
    else
      s[4..-1]
    end
  end

  def release_date_format(release_date, release_date_precision)
    format = "%Y"
    format = "%Y-%m-%d" if release_date_precision == "day"
    Time.zone.strptime(release_date, format).to_date.strftime("%d/%m/%Y")
  end
end
